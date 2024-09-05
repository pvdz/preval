# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let b = { x: 1 };

  let a = { a: 999, b: 1000 };
  $(b)?.x;
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  $(b)?.x;
  $(a);
}
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
} else {
}
$(a);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  tmpChainElementCall.x;
}
const a = { a: 999, b: 1000 };
$(a);
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
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
