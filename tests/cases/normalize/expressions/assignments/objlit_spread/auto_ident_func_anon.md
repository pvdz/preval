# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = function () {}) });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({
  ...(a = function () {
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
};
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpSSA_a = function () {
  debugger;
};
const tmpCalleeParam = { ...tmpSSA_a };
$(tmpCalleeParam);
$(tmpSSA_a);
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
