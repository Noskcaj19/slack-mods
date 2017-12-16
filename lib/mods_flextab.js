const mods_flextab = `<div id="mods_tab" class="panel">
    <div class="mods_flexpane">
        <div class="heading">
            <div class="heading_row">
                <h2 class="heading_text overflow_ellipsis">
                    Slack Mods
                </h2>
                <button type="button" title="Close Right Sidebar" aria-label="Close Right Sidebar" class="p-downloads_list__flex_close btn_basic close_flexpane">
                    <i class="c-icon c-icon--times c-icon--align-top" type="times" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div id="mods_scroller" class="flex_content_scroller">
            <div class="selectable_flex_pane_padder">
                <div id="mods_explanation" class="help">
                    <p>You haven't installed any mods yet</p>
                </div>
            </div>
        </div>
    </div>
</div>
`;

(function injectFlextab() {
    document.addEventListener("DOMContentLoaded", function () {
        $("#flex_contents").append(mods_flextab)
        TS.boot_data.special_flex_panes = [{ flex_name: 'mods', label: 'Slack Mods' }]
    })
})()
