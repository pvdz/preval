# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = $(b)[$("c")]);
}
$(f());
$(a, b);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = $(b)[$('c')]);
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpAssignRhsCompObj = $(b);
  const tmpAssignRhsCompProp = $('c');
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  let tmpReturnArg = a;
  return tmpReturnArg;
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $('c');
const tmpSSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(tmpSSA_a);
$(tmpSSA_a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 1
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
