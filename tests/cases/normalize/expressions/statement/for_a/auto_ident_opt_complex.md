# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > For a > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ($(b)?.x; $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  $(b)?.x;
  while ($(0)) {}
}
$(a);
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
let tmpIfTest$1 = $(0);
while (true) {
  if (tmpIfTest$1) {
    tmpIfTest$1 = $(0);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  tmpChainElementCall.x;
}
let tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  tmpIfTest$1 = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest$1) {
      tmpIfTest$1 = $(0);
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
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( a );
const d = c == null;
if (d) {

}
else {
  c.x;
}
let e = $( 0 );
if (e) {
  e = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (e) {
      e = $( 0 );
    }
    else {
      break;
    }
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
