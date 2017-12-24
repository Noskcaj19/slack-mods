const mods_flextab = `
<div id="mods_tab" class="panel">
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
        <div id="member_mods_list"></div>
        <div class="selectable_flex_pane_padder">
            <div id="mods_explanation" class="help">
                <p>Your installed mods will show up here</p>
            </div>
        </div>
    </div>
</div>
`;

const mod_profile_template_raw = `<div class="app_profile">
    <div class="app_card_header display_flex flex_direction_row align_items_flex_start app_header_large rounded">
		<img class="app_card_header_icon rounded" src="{{icon_url}}">
		<div class="app_card_header_text">
			<div class="app_card_name_row black flexpane_grey display_flex align_items_center">
				<span class="app_name overflow_ellipsis">{{name}}</span>
				<div><span class="app_label neutral_white">MOD</span></div>
			</div>
				<div class="app_card_desc flexpane_grey overflow_hidden emoji_replace_on_load">{{short_description}}</div>
				<!-- <div.app_profile_buttons> -->
		</div>
    </div>
    {{#if description}}
    <div class="charcoal_grey large_bottom_margin">
        <div class="app_profile_section_header"></div>
        <div class="app_profile_section_text app_profile_desc">
            {{description}}
        </div>
    </div>
    {{/if}}
</div>
<hr>`;

let _mod_profile_template = null
function mod_profile_template() {
    if (_mod_profile_template !== null) {
        return _mod_profile_template
    }
    _mod_profile_template = Handlebars.compile(mod_profile_template_raw)
    return _mod_profile_template
}

exports.injectFlextab = function () {
    document.addEventListener("DOMContentLoaded", function () {
        $("#flex_contents").append(mods_flextab)
        TS.boot_data.special_flex_panes = [{ flex_name: 'mods', label: 'Slack Mods' }]
    })
}

//TODO: Add lazy loading
//TODO: Add full description
exports.addMod = function (mod) {
    document.addEventListener("DOMContentLoaded", function () {
        $("#mods_explanation").hide()
        let profile = mod_profile_template()({
            name: mod.displayname ? mod.displayname : mod.name,
            short_description: mod.description,
            description: null,
            icon_url: mod.icon ? mod.icon : "https://slack.global.ssl.fastly.net/bfaba/img/apps/default_new_app_icon.png"
        })
        $("#member_mods_list").append(profile)
    })
}
