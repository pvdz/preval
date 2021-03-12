# Preval test case

# import_default_number.md

> Import > Import default number
>
> Import statements need special care in our system and our tests

The code frames should have a filename that matches the exact string that is used in imports. And just work.

Also, defaults should work :p

#TODO

## Input

`````js filename=intro
import x from 'x';
$(x);
`````

`````js filename=x
export default 100;
`````

## Pre Normal

`````js filename=intro
import x from 'x';
$(x);
`````

`````js filename=x
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
`````

## Normalized

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
`````

## Output

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
