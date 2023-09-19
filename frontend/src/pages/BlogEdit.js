import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import '@mdxeditor/editor/style.css';
import {
    MDXEditor,
    AdmonitionDirectiveDescriptor,
    UndoRedo,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    directivesPlugin,
    frontmatterPlugin,
    headingsPlugin,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    sandpackPlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    Separator,
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    CreateLink,
    DiffSourceToggleWrapper,
    InsertImage,
    ListsToggle,
} from '@mdxeditor/editor';


const BlogEdit = () => {
    const params = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "blogs", params.id), (doc) => {
            setBlog(doc.data());
        });
        return () => unsubscribe();
    }, [params.id]);

    const handleUpdate = async (content) => {
        let date = new Date();
        await updateDoc(doc(db, "blogs", params.id), {
            dateUpdated: date,
            content: content,
        });
    };

    return (
        <div className="mt-3">
            { blog === null ? <p>Loading...</p> : (
                <MDXEditor
                    markdown={blog.content}
                    onChange={handleUpdate}
                    plugins={[toolbarPlugin({
                        toolbarContents: () => (
                                <>
                                    <DiffSourceToggleWrapper>
                                        <UndoRedo />
                                        <BoldItalicUnderlineToggles />
                                        <ListsToggle />
                                        <Separator />
                                        <BlockTypeSelect />
                                        <CreateLink />
                                        <InsertImage />
                                        <Separator />
                                    </DiffSourceToggleWrapper>
                                </>
                            )
                        }),
                        listsPlugin(),
                        quotePlugin(),
                        headingsPlugin(),
                        linkPlugin(),
                        linkDialogPlugin(),
                        imagePlugin(),
                        tablePlugin(),
                        thematicBreakPlugin(),
                        frontmatterPlugin(),
                        // codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
                        // sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
                        // codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text' } }),
                        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
                        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: blog.content }),
                        markdownShortcutPlugin()
                    ]}
                />
            )}
        </div>
    );
}

export default BlogEdit;
