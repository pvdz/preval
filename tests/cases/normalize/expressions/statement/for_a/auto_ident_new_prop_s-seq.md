# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Statement > For a > Auto ident new prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (new (1, 2, b).$(1); $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  new (1, 2, b).$(1);
  while ($(0)) {}
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
new tmpNewCallee(1);
let tmpIfTest = $(0);
while (true) {
  if (tmpIfTest) {
    tmpIfTest = $(0);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
new $(1);
let tmpIfTest = $(0);
if (tmpIfTest) {
  tmpIfTest = $(0);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      tmpIfTest = $(0);
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
new $( 1 );
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
 - 1: 1
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
