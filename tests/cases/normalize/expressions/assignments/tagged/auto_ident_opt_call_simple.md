# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $?.(1))} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
let a = undefined;
const tmpIfTest = $ == null;
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
} else {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  $(tmpCalleeParam, tmpChainElementCall);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
let b = undefined;
const c = $ == null;
if (c) {
  $( a, undefined );
}
else {
  const d = $( 1 );
  b = d;
  $( a, d );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
