# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > For a > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((10, 20, 30) ? $(2) : $($(100)); $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  (10, 20, 30) ? $(2) : $($(100));
  while ($(0)) {}
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = 30;
if (tmpIfTest) {
  $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpCallCallee(tmpCalleeParam);
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
$(2);
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
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
let a = $( 0 );
if (a) {
  a = $( 0 );
  while ($LOOP_UNROLL_10) {
    if (a) {
      a = $( 0 );
    }
    else {
      break;
    }
  }
}
const b = {
a: 999,
b: 1000
;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
