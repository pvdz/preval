# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $($(0)) || 2); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $($(0)) || 2)) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    a = 2;
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
const tmpCalleeParam = $(0);
let a = $(tmpCalleeParam);
if (a) {
} else {
  a = 2;
}
if (a) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$1 = $(0);
    a = $(tmpCalleeParam$1);
    if (a) {
    } else {
      a = 2;
    }
    if (a) {
      $(1);
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
let a = true;
const b = $( 0 );
let c = $( b );
if (c) {

}
else {
  c = 2;
}
if (c) {
  $( 1 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const d = $( 0 );
    c = $( d );
    if (c) {

    }
    else {
      c = 2;
    }
    if (c) {
      $( 1 );
    }
    else {
      break;
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 0
 - 5: 0
 - 6: 1
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 0
 - 11: 0
 - 12: 1
 - 13: 0
 - 14: 0
 - 15: 1
 - 16: 0
 - 17: 0
 - 18: 1
 - 19: 0
 - 20: 0
 - 21: 1
 - 22: 0
 - 23: 0
 - 24: 1
 - 25: 0
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
