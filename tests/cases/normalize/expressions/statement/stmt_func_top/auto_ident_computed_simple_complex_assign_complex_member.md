# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident computed simple complex assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: 10, d: 20 };

  let a = { a: 999, b: 1000 };
  b[$("c")] = $(b)[$("d")];
  $(a, b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  b[$('c')] = $(b)[$('d')];
  $(a, b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  const tmpAssignComMemLhsObj = b;
  const tmpAssignComMemLhsProp = $('c');
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { c: 10, d: 20 };
  const a = { a: 999, b: 1000 };
  const tmpAssignComMemLhsProp = $('c');
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
  $(a, b);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
