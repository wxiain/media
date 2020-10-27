window.onload = function () {
  let oButtons = document.querySelectorAll("button");
  let aInput = document.querySelector("input");
  let aFiles = document.querySelector(".files");
  let objectList = {};
  let index = 1;
  // 给按钮添加点击事件
  for (let i = 0; i < oButtons.length; i++) {
    let item = oButtons[i];
    item.onclick = function () {
      if (!i) {
        aInput.click();
      } else {
        console.log(createFormData());
      }
    };
  }
  // 监听input的change事件
  aInput.addEventListener("change", function (e) {
    let files = aInput.files;
    renderFile(files);
  });
  // 监听拖拽事件
  document.addEventListener("drop", function (e) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    renderFile(files);
  });
  document.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  // 绑定委托事件, 利用冒泡机制
  aFiles.onclick = function (e) {
    e = e || window.e;
    let target = e.target || e.srcElement;
    if (target.classList.contains("close")) {
      let name = target.dataset.name;
      Reflect.deleteProperty(objectList, name);
      this.removeChild(target.parentNode);
    }
  };
  //生成li
  function createLi(item) {
    let li = document.createElement("li");
    let child = `
    <span>${item.name}</span>
    <span class="flex-sub"></span>
    <span class="close cursor-pointer" data-name="${item.name}">x</span>
    `;
    li.innerHTML = child;
    li.classList.add("flex", "align-center");
    aFiles.appendChild(li);
  }
  // 渲染文件, 可删除
  function renderFile(files) {
    for (let i = 0; i < files.length; i++) {
      let item = files[i];
      if (objectList[item.name]) {
        index++;
        continue;
      }
      objectList[item.name] = item;
      createLi(item);
    }
    // 这里后期可以添加一个跳过了多少重复的文件
  }
  // formData
  function createFormData() {
    let formData = new FormData();
    for (let item of Object.values(objectList)) {
      formData.append(item.name, item);
    }
    return formData;
  }
};
