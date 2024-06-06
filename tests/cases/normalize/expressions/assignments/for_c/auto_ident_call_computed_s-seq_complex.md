# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident call computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = (1, 2, b)[$("$")](1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = (1, 2, b)[$(`\$`)](1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpCallCompObj = b;
    const tmpCallCompProp = $(`\$`);
    a = tmpCallCompObj[tmpCallCompProp](1);
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCompProp = $(`\$`);
  const b = { $: $ };
  b[tmpCallCompProp](1);
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpCallCompProp$1 = $(`\$`);
      b[tmpCallCompProp$1](1);
      tmpClusterSSA_tmpIfTest = $(1);
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
const a = $( 1 );
if (a) {
  const b = $( "$" );
  const c = { $: $ };
  c[ b ]( 1 )};
  let d = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (d) {
      const e = $( "$" );
      c[ e ]( 1 )};
      d = $( 1 );
    }
    else {
      break;
    }
  }
}
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: '$'
 - 6: 1
 - 7: 1
 - 8: '$'
 - 9: 1
 - 10: 1
 - 11: '$'
 - 12: 1
 - 13: 1
 - 14: '$'
 - 15: 1
 - 16: 1
 - 17: '$'
 - 18: 1
 - 19: 1
 - 20: '$'
 - 21: 1
 - 22: 1
 - 23: '$'
 - 24: 1
 - 25: 1
 - 26: '$'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
