var code = `class mergestate(object):
    def __init__(self, repo):
        self._repo = repo
        self._dirty = False
        self._read()
    def reset(self, node=None):
        self._state = {}
        if node:
            self._local = node
        shutil.rmtree(self._repo.join("merge"), True)
        self._dirty = False
    def _read(self):
        self._state = {}
        try:`
export default code;
