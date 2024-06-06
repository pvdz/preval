# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = $?.(1))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = $?.(1));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpSwitchDisc = a;
$(100);
$(a);
`````

## Output


`````js filename=intro
let a = undefined;
const tmpIfTest = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
}
$(100);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $ == null;
if (b) {

}
else {
  const c = $( 1 );
  a = c;
}
$( 100 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
