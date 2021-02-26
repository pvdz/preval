# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = (1, 2, $(b))[$("c")]);
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function () {
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
const f = function () {
  const tmpAssignRhsCompObj = $(b);
  const tmpAssignRhsCompProp = $('c');
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  const tmpReturnArg = a;
  return tmpReturnArg;
};
const b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
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

Normalized calls: Same

Final output calls: Same
