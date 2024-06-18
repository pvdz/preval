# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident computed s-seq simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 10, d: 20 };

    let a = { a: 999, b: 1000 };
    (1, 2, b)[$("c")] = $(b)[$("d")];
    $(a, b);
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { c: 10, d: 20 };
    let a = { a: 999, b: 1000 };
    (1, 2, b)[$(`c`)] = $(b)[$(`d`)];
    $(a, b);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  const tmpAssignComMemLhsObj = b;
  const tmpAssignComMemLhsProp = $(`c`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const tmpAssignComMemLhsProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
b[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a, b);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = {
  a: 999,
  b: 1000,
};
const c = $( "c" );
const d = $( a );
const e = $( "d" );
const f = d[ e ];
a[c] = f;
$( b, a );
$( undefined );
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
