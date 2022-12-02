  function dismissAlert(e){
    let element = e.target;
    while(element.nodeName !== "SPAN"){
      element = element.parentNode;
    }
    element.parentNode.parentNode.removeChild(element.parentNode);
  }