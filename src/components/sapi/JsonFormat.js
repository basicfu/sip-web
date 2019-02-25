import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import jsonObjToHTML from 'utils/jsonFormat';
import NoSsr from '@material-ui/core/NoSsr';
import notify from "utils/notify";
const styles = theme => ({
  tabs: {
    minHeight: 0,
  },
  jsonFormat: {
    height: '100%',
    overflow: 'auto',
  },
});
let lastKvovIdGiven = 0;
let getJsonText = function (el) {
  let txt = el.innerText.replace(/":\s/gm, '":').replace(/,$/, '').trim();
  if (!(/^{/.test(txt) && /\}$/.test(txt)) && !(/^\[/.test(txt) && /\]$/.test(txt))) {
    txt = '{' + txt + '}';
  }
  try {
    txt = JSON.stringify(JSON.parse(txt), null, 4);
  } catch (err) {
  }
  return txt;
};
function toggle(element,jfStyleEl){
  let parentElement = element.parentElement;
  if(parentElement.classList.contains("collapsed")){
    parentElement.className = parentElement.className.replace(new RegExp('(\\s|^)' + "collapsed" + '(\\s|$)'), ' ');
  }else{
    parentElement.className += " " + "collapsed"
    const blockInner=parentElement.querySelector('.blockInner');
    if (blockInner.childNodes.length) {
      if (!parentElement.getAttribute('id')) {
        lastKvovIdGiven+=1;
        parentElement.setAttribute("id",'kvov' + lastKvovIdGiven);
        let count =blockInner.childNodes.length;
        let comment = count + (count === 1 ? ' item' : ' items');
        jfStyleEl.insertAdjacentHTML(
          'beforeend',
          `\n#kvov${  lastKvovIdGiven  }.collapsed:after{color: #aaa; content:" // ${  comment  }"}`
        );
      }
    }
  }
}
class JsonFormat extends React.Component {
  componentDidMount() {

  }
  componentWillUnmount() {
    let jfStyleEl=document.getElementById("jfStyleEl");
    let jfOptEl=document.getElementById("boxOpt");
    let jfPathEl=document.getElementById("jfPathEl");
    jfStyleEl&&document.head.removeChild(jfStyleEl);
    jfOptEl&&document.body.removeChild(jfOptEl);
    jfPathEl&&document.body.removeChild(jfPathEl);
  }
  renderDom(data){
    if (process.browser) {
      document.head.appendChild(document.createRange().createContextualFragment('<style id="jfStyleEl"/>'));
      document.body.appendChild(document.createRange().createContextualFragment('<div id="boxOpt"><a class="opt-copy">复制</a></div>'));
      document.body.appendChild(document.createRange().createContextualFragment('<div id="jfPathEl"/>'));
      let jfStyleEl=document.getElementById("jfStyleEl");
      let jfOptEl=document.getElementById("boxOpt");
      let jfPathEl=document.getElementById("jfPathEl");
      jfStyleEl.style.display='none';
      jfOptEl.style.display='none';
      jfPathEl.style.display='none';
      const html = jsonObjToHTML(data,null);
      let htmlElement=document.getElementById("jfContent");
      htmlElement.innerHTML=html;
      htmlElement.querySelectorAll(".e").forEach(element=>{
        element.onclick=function () {
          toggle(element,jfStyleEl)
        }
      });
      htmlElement.querySelectorAll(".kvov").forEach(element=>{
        element.onclick=function (e) {
          if(element.classList.contains("x-outline")){
            if(jfOptEl){
              jfOptEl.style.display="none";
            }
            if(jfPathEl){
              jfPathEl.style.display="none";
            }
            element.classList.remove("x-outline");
            const optCopy=element.querySelector('.optCopy')
            if(optCopy){
              element.removeChild(optCopy);
            }
            e.stopPropagation();
            return true;
          }
          const xOutline=htmlElement.querySelector(".x-outline");
          if(xOutline){
            xOutline.classList.remove("x-outline");
            xOutline.removeChild(xOutline.querySelector('.optCopy'));
          }
          element.classList.remove("x-hover");
          element.classList.add("x-outline");
          element.insertBefore(document.createRange().createContextualFragment(
            '<span class="optCopy" style="position: absolute;right: 50px;color: #2196f3;font-weight:400;cursor:pointer">复制</span>'
          ),element.childNodes[0]);
          element.querySelector('.optCopy').onclick=function () {
            element.removeChild(element.querySelector('.optCopy'));
            let input = document.createElement('textarea');
            input.style.position = 'fixed';
            input.style.opacity = 0;
            input.value = getJsonText(element);
            document.body.appendChild(input);
            input.select();
            document.execCommand('Copy');
            document.body.removeChild(input);
            notify.success("JSON片段复制成功");
          };
          e.stopPropagation();
          let curEl=element;
          let keys = [];
          do {
            if (curEl.classList.contains('arrElem')) {
              if (!curEl.classList.contains('rootKvov')) {
                let ary = [], pre = curEl.previousElementSibling;
                while (pre&&pre.classList.contains('kvov')) {
                  ary.push(pre);
                  pre = pre.previousElementSibling;
                }
                keys.unshift('[' + ary.length + ']');
              }
            } else {
              keys.unshift(curEl.querySelector('.k').innerText);
            }
            const culElParent=curEl;
            if((culElParent.classList.contains('rootKvov')) || (culElParent.parentElement.classList.contains('rootKvov'))) {
              break;
            }
            curEl = curEl.parentElement.parentElement;
          } while (curEl && !curEl.classList.contains('rootKvov'));
          let path = keys.join('#@#').replace(/#@#\[/g, '[').replace(/#@#/g, '.');
          jfPathEl.innerHTML='当前路径：'+path;
          jfPathEl.style.display='';
        };
        element.onmouseover=function (e) {
          element.classList.add('x-hover');
          e.stopPropagation();
        };
        element.onmouseout=function (e) {
          element.classList.remove('x-hover');
        };
      });
    }
  }
  render() {
    const { classes,data } = this.props;
    let isJson=false;
    try {
      JSON.parse(data);
      isJson=true;
    }catch (e) {
    }
    if(isJson){
      this.renderDom(JSON.parse(data));
    }
    return (
      <div id="jfContent" className={classes.jsonFormat} />
    );
  }
}

export default withStyles(styles)(JsonFormat);
