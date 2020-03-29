!macro customInit
  ${ifNot} ${isUpdated}
    nsExec::Exec '"$LOCALAPPDATA\visionbrowser\Update.exe" --uninstall -s'
    delete "$LOCALAPPDATA\visionbrowser\Update.exe"
    delete "$LOCALAPPDATA\visionbrowser\.dead"
    rmDir "$LOCALAPPDATA\visionbrowser"
  ${endIf}
!macroend