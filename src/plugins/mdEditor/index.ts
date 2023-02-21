
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'

//使用的是vuepress主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';


//预览器
//import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';


import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';


import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';

import Prism from "prismjs"

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
})

// VMdPreview.use(vuepressTheme, {
//     Prism,
// });

VMdPreview.use(githubTheme, {
    Hljs: hljs,
  });

VueMarkdownEditor.use(createAlignPlugin());
VMdPreview.use(createAlignPlugin());


export {VueMarkdownEditor,VMdPreview}

