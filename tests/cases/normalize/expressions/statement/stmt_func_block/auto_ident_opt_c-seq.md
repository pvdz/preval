# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = { a: 999, b: 1000 };
    (1, 2, $(b))?.x;
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
    let b = { x: 1 };
    let a = { a: 999, b: 1000 };
    (1, 2, $(b))?.x;
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  const tmpChainRootProp = $(b);
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.x;
  } else {
  }
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
} else {
  tmpChainRootProp.x;
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
if (c) {

}
else {
  b.x;
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
