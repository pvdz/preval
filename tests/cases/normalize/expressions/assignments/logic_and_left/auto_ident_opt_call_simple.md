# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) && $(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) && $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = undefined;
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall /*:unknown*/ = $(1);
  a = tmpChainElementCall;
  tmpCalleeParam = tmpChainElementCall;
}
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  a = d;
  b = d;
}
if (a) {
  const e = $( 100 );
  $( e );
}
else {
  $( b );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 100
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
