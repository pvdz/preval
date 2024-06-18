# Preval test case

# import_default_anon_func.md

> Import > Import default anon func
>
> Import statements need special care in our system and our tests

The code frames should have a filename that matches the exact string that is used in imports. And just work.

Their name should also be `'*default*'`, and we have no alternative transform available for this.

## Input

`````js filename=intro
import x from 'x';
$(x());
$(x.name);
`````

`````js filename=x
export default function() {
  return 100;
};
`````

## Pre Normal


`````js filename=intro
import x from 'x';
$(x());
$(x.name);
`````

`````js filename=x
const tmpAnonDefaultExport = function () {
  debugger;
  return 100;
};
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
import { default as x } from 'x';
const tmpCallCallee = $;
const tmpCalleeParam = x();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = x.name;
tmpCallCallee$1(tmpCalleeParam$1);
`````

`````js filename=x
const tmpAnonDefaultExport = function () {
  debugger;
  return 100;
};
export { tmpAnonDefaultExport as default };
`````

## Output


`````js filename=intro
import { default as x } from 'x';
const tmpCalleeParam = x();
$(tmpCalleeParam);
const tmpCalleeParam$1 = x.name;
$(tmpCalleeParam$1);
`````

`````js filename=x
const tmpAnonDefaultExport = function () {
  debugger;
  return 100;
};
export { tmpAnonDefaultExport as default };
`````

## PST Output

With rename=true

`````js filename=intro
import { default as x from "x";
const a = x();
$( a );
const b = x.name;
$( b );
`````

`````js filename=x
import { default as x from "x";
const a = x();
$( a );
const b = x.name;
$( b );
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
