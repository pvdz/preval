# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) + (a = $?.(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) + (a = $?.(1)));
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
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpIfTest$1 = tmpChainRootCall$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementCall$1 = tmpChainRootCall$1(1);
  a = tmpChainElementCall$1;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const tmpIfTest = $ == null;
let tmpBinBothLhs = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  tmpBinBothLhs = tmpChainElementCall;
}
const tmpIfTest$1 = $ == null;
let tmpCalleeParam = undefined;
if (tmpIfTest$1) {
  tmpCalleeParam = tmpBinBothLhs + a;
  $(tmpCalleeParam);
} else {
  const tmpChainElementCall$1 = $(1);
  a = tmpChainElementCall$1;
  tmpCalleeParam = tmpBinBothLhs + tmpChainElementCall$1;
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
let c = undefined;
if (b) {

}
else {
  const d = $( 1 );
  a = d;
  c = d;
}
const e = $ == null;
let f = undefined;
if (e) {
  f = c + a;
  $( f );
}
else {
  const g = $( 1 );
  a = g;
  f = c + g;
  $( f );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
