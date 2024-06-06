# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Logic or left > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) || $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) || $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpIfTest$1 = tmpChainRootCall != null;
if (tmpIfTest$1) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpIfTest = tmpChainElementCall;
} else {
}
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpIfTest = false;
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall = $(1);
  tmpIfTest = tmpChainElementCall;
}
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
let b = false;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  b = d;
}
if (b) {

}
else {
  $( 100 );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
