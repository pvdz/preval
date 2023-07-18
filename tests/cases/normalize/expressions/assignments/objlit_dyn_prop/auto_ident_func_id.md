# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident func id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = function f() {})]: 10 });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({
  [(a = function f() {
    debugger;
  })]: 10,
});
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const f = function () {
  debugger;
  return undefined;
};
a = f;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = { [f]: 10 };
$(tmpCalleeParam);
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
},;
const b = { a[ 10 ]: 10 };
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 'function() {return undefined;}': '10' }
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD?!
 - 1: { 'function() {\ndebugger;\nreturn undefined;\n}': '10' }
 - 2: '<function>'
 - eval returned: undefined

Final output calls: BAD!!
 - 1: { 'function() {\ndebugger;\nreturn undefined;\n}': '10' }
 - 2: '<function>'
 - eval returned: undefined
