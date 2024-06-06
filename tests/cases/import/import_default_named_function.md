# Preval test case

# import_default_named_function.md

> Import > Import default named function
>
> Import statements need special care in our system and our tests

Named functions are default exported as live bindings.

This means that a change to the value of the binding should be reflected by the import.

(Exported functions are defined as `let` bindings.)

#TODO

## Input

`````js filename=intro
import x from 'x';
$(x); // 10
`````

`````js filename=x
export default function f() {}
f = 10;
`````

## Pre Normal


`````js filename=intro
import x from 'x';
$(x);
`````

`````js filename=x
let f = function () {
  debugger;
};
f = 10;
export { f as default };
`````

## Normalized


`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
let f = function () {
  debugger;
  return undefined;
};
f = 10;
export { f as default };
`````

## Output


`````js filename=intro
import { default as x } from 'x';
$(x);
`````

`````js filename=x
const f = 10;
export { f as default };
`````

## PST Output

With rename=true

`````js filename=intro
const a = 10;
export { a as default from "undefined"
`````

`````js filename=x
const a = 10;
export { a as default from "undefined"
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
