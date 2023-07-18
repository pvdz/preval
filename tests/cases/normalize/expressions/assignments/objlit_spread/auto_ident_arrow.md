# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = () => {}) });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({
  ...(a = () => {
    debugger;
  }),
});
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = function () {
  debugger;
  return undefined;
};
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = { ...a };
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
},;
const b = { ... a };
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
