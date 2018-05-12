//按约定类名找到容器内的所有 tab 元素和内容元素，我们可以在初始化的时候将这些元素保存在对象属性中。
function Tab(containerId) {
    var container = document.getElementById(containerId);
    this.container = container;
    this.tabItems = container.querySelectorAll('.tab-item');
    this.panels = container.querySelectorAll('.panel');
}
//实现 active 方法，给对应序号的 tab 元素增加 active 类名，同时显示对应序号的内容框，修改其它不需要显示的元素的状态。这里 tab 元素和内容元素的对应关系是通过 tab 元素 href 属性去找对应 id 的内容框。
Tab.prototype.active = function(index) {
    // 如果当前 toActive 等于当前 active 元素
    if (index === this.activeIndex) {
        return;
    }
    this.tabItems.forEach(function(tabItem, i) {
        // 获取元素的 href 属性作为目标的 id
        var targetId = tabItem.getAttribute('href');
        var targetPanel = this.container.querySelectorAll('#' + targetId)[0];
        if (!targetPanel) return;
        // 如果序号等于目标序号，则加类名和显示内容框
        if (index === i) {
            targetPanel.style.display = 'block';
            tabItem.classList.add('active');
            this.activeIndex = i;
        // 如果不等于目标序号，则要去掉类名和隐藏内容框
        } else {
            targetPanel.style.display = 'none';
            tabItem.classList.remove('active');
        }
    }, this);
}
//绑定点击事件，点击 tab 算出对应的序号，直接调用 active 方法。
Tab.prototype.listenEvents = function() {
    let self = this;
    this.container.addEventListener('click', function(e) {
        var target = e.target;
        if (target.className && target.className === 'tab-item') {
            var children = target.parentNode.children;
            var index = -1;
            for (var i = 0; i < children.length; i++) {
                if (children[i] === target) {
                    index = i;
                }
            }
            if (index >= 0) {
                self.active(index);
            }
        }
    });
};

var tab = new Tab('container1');
tab.active(0);
tab.listenEvents();
var tab2 = new Tab('container2');
tab2.active(2);
tab2.listenEvents();
