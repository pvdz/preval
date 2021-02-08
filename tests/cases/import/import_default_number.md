# Preval test case

# import_default.md

> import > import_default
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

## Normalized

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
const tmpExportDefault = 100;
export { tmpExportDefault as default };
`````

## Output

`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
export { tmpExportDefault as default };
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Normalized calls: Same

Final output calls: Same
