# Preval test case

# auto_computed_simple_complex_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto computed simple complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = { b: $(1) };
    a[$("b")] = 2;
    $(a);
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let a = { a: 999, b: 1000 };
    a = { b: $(1) };
    a[$(`b`)] = 2;
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  const tmpAssignComMemLhsObj = a;
  const tmpAssignComMemLhsProp = $(`b`);
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const tmpAssignComMemLhsProp = $(`b`);
const a = { b: tmpObjLitVal };
a[tmpAssignComMemLhsProp] = 2;
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( "b" );
const c = { b: a };
c[b] = 2;
$( c );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'b'
 - 3: { b: '2' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
