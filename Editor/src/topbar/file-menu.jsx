import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Position, Menu, MenuItem, MenuDivider, Popover } from '@blueprintjs/core';
import { Plus, Translate, FolderOpen, FloppyDisk, Import, AlignJustify, Home } from '@blueprintjs/icons';
import { downloadFile } from 'polotno/utils/download';
import { svgToJson } from 'polotno/utils/from-svg';

export const FileMenu = observer(({ store, project }) => {
  const inputRef = React.useRef();
  return (
    <>
      <Popover
        content={
          <Menu>
            {/* <MenuDivider title={t('toolbar.layering')} /> */}
            <MenuItem
              icon={<Plus />}
              text="Create new design"
              onClick={() => {
                project.createNewDesign();
              }}
            />
            <MenuDivider />
            <MenuItem
              icon={<FolderOpen />}
              text="Open"
              onClick={() => {
                document.querySelector('#load-project').click();
              }}
            />
            <MenuItem
              icon={<Import />}
              text="Import svg (experimental)"
              onClick={() => {
                document.querySelector('#svg-import-input').click();
              }}
            />
            <MenuItem
              icon={<FloppyDisk />}
              text="Save as JSON"
              onClick={() => {
                const json = store.toJSON();

                const url =
                  'data:text/json;base64,' +
                  window.btoa(
                    unescape(encodeURIComponent(JSON.stringify(json)))
                  );

                downloadFile(url, 'polotno.json');
              }}
            />

            <MenuDivider />
            <MenuItem text="Language" icon={<Translate />}>
              <MenuItem
                text="English"
                active={project.language.startsWith('en')}
                onClick={() => {
                  project.setLanguage('en');
                }}
              />
              <MenuItem
                text="Portuguese"
                active={project.language.startsWith('pt')}
                onClick={() => {
                  project.setLanguage('pt');
                }}
              />
              <MenuItem
                text="French"
                active={project.language.startsWith('fr')}
                onClick={() => {
                  project.setLanguage('fr');
                }}
              />
              <MenuItem
                text="Russian"
                active={project.language.startsWith('ru')}
                onClick={() => {
                  project.setLanguage('ru');
                }}
              />
              <MenuItem
                text="Indonesian"
                active={project.language.startsWith('id')}
                onClick={() => {
                  project.setLanguage('id');
                }}
              />
            </MenuItem>
            <MenuItem
              text="Home"
              icon={<Home />}
              onClick={() => {
                // Navigate back to the application's homepage
                // Adjust path if editor is hosted on a different subpath
                // Use absolute URL and replace to avoid SPA/PWA navigation interception
                window.location.replace('http://127.0.0.1:5500/Teacher/homepage.html');
              }}
            />
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
      >
        <Button minimal icon={<AlignJustify />} />
      </Popover>
      <input
        type="file"
        id="load-project"
        accept=".json,.polotno"
        ref={inputRef}
        style={{ width: '180px', display: 'none' }}
        onChange={(e) => {
          var input = e.target;

          if (!input.files.length) {
            return;
          }

          var reader = new FileReader();
          reader.onloadend = async function () {
            var text = reader.result;
            let json;
            try {
              json = JSON.parse(text);
            } catch (e) {
              alert('Can not load the project.');
            }

            const errors = store.validate(json);
            if (errors.length > 0) {
              alert('Can not load the project. See console for details.');
              console.error(errors);
              return;
            }

            if (json) {
              await project.createNewDesign();
              store.loadJSON(json);
              project.save();
              input.value = '';
            }
          };
          reader.onerror = function () {
            alert('Can not load the project.');
          };
          reader.readAsText(input.files[0]);
        }}
      />
      <input
        type="file"
        id="svg-import-input"
        accept=".svg"
        ref={inputRef}
        style={{ width: '180px', display: 'none' }}
        onChange={(e) => {
          var input = e.target;

          if (!input.files.length) {
            return;
          }

          var reader = new FileReader();
          reader.onloadend = async function () {
            var text = reader.result;
            let json;
            try {
              json = await svgToJson(text);
            } catch (e) {
              alert('Can not load the project.');
            }

            const errors = store.validate(json);
            if (errors.length > 0) {
              alert('Can not load the project. See console for details.');
              console.error(errors);
              return;
            }

            if (json) {
              await project.createNewDesign();
              store.loadJSON(json);
              project.save();
              input.value = '';
            }
          };
          reader.onerror = function () {
            alert('Can not load the project.');
          };
          reader.readAsText(input.files[0]);
        }}
      />
      {/* Removed About dialog; Home now navigates directly to the app homepage */}
    </>
  );
});
