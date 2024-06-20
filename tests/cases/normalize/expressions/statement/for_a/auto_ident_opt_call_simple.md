# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > For a > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ($?.(1); $(0); );
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $?.(1);
  while ($(0)) {}
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
} else {
}
while (true) {
  const tmpIfTest$1 = $(0);
  if (tmpIfTest$1) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpIfTest = $ == null;
if (tmpIfTest) {
} else {
  $(1);
}
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $(0);
    if (tmpIfTest$2) {
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = $ == null;
if (b) {

}
else {
  $( 1 );
}
const c = $( 0 );
if (c) {
  while ($LOOP_UNROLL_10) {
    const d = $( 0 );
    if (d) {

    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
