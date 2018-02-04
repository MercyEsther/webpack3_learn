# webpack3_learn

> 参考：https://webpack.js.org/concepts/

## 入口Entry

 > 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

#### 单入口写法：

 ```javascript
module.exports = {
    entry: "./path/myEntryFile.js"
}
 ```

 #### 多入口写法：

 ```javascript
module.exports = {
    entry: {
        app: "./src/app.js",
        vendors: "./src/vendors.js"
    }
}
 ```

相对于单入口写法，多入口告诉webpack需要3个独立分离的依赖图；

每个HTML文档最好使用一个入口起点；

## output 出口

> output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件

```javascript
const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist),
        filename: 'bundle.js'
    }
}
```

> 扩展： path.join 和 path.resolve
path.join只是简单的将该路径片段进行拼接，而path.resolve将以/开始的路径片段作为根目录

```javascript 
path.join(__dirname, '/dist', 'static') 
// /users/admin/projects/webpack/dist/static

path.resolve(__dirname, '/dist', 'static')
// /dist/static
```

#### 重要的output选项

- output.publicPath

> 此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」。相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析。相对于服务的 URL(Server-relative URL)，相对于协议的 URL(protocol-relative URL) 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。

```javascript
// 简单规则如下：output.path 中的 URL 以 HTML 页面为基准。
path: path.resolve(__dirname, "public/assets"),
publicPath: "https://cdn.example.com/assets/"

// 示例
publicPath: "https://cdn.example.com/assets/", // CDN（总是 HTTPS 协议）
publicPath: "//cdn.example.com/assets/", // CDN (协议相同)
publicPath: "/assets/", // 相对于服务(server-relative)
publicPath: "assets/", // 相对于 HTML 页面
publicPath: "../assets/", // 相对于 HTML 页面
publicPath: "", // 相对于 HTML 页面（目录相同）
```

## loader

> oader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图可以直接引用的模块。

```javascript
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

以上配置中，对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。这告诉 webpack 编译器(compiler) 如下信息：

“嘿，webpack 编译器，当你碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。”

#### 加载css文件

```
// 使webpack能加载css文件
npm install --save-dev css-loader
// 将typescript转为javacript
npm install --save-dev ts-loader
```

```javascript
module.exports = {
    module:{
        rules: {
            {test: /\.css$/, use: 'css-loader'},
            {test: /\.ts$/, use: 'ts-loader'}
        }
    }
}
```

#### 三种loader方式

- 配置

```javascript
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```

- 内联

可以在 import 语句或任何等效于 "import" 的方式中指定 loader。使用 ! 将资源中的 loader 分开。分开的每个部分都相对于当前目录解析。

```javascript
import Styles from 'style-loader!css-loader?modules!.styles.css';
```

> 尽可能使用 module.rules，因为这样可以减少源码中的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题。

- CLI

```
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

## plugins 插件

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

#### webpack内置插件

> https://doc.webpack-china.org/plugins

#### 第三发插件

> https://github.com/webpack-contrib/awesome-webpack#webpack-plugins

