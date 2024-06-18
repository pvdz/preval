# Preval test case

# no__cond_read_before_write.md

> Binding > Promote const > No  cond read before write
>
> Test case where the read of a var binding occurs before the write, even if it never does so (though preval won't be able to assert this).

We can't make x a constant.

## Input

`````js filename=intro
var x;
{
  if ($(0)) {
    $(x, 'fail'); // never procs but preval can't discover that
  }
  x = 10;
  if ($(1)) {
    $(x);
  }
}
`````

## Pre Normal


`````js filename=intro
let x = undefined;
{
  if ($(0)) {
    $(x, `fail`);
  }
  x = 10;
  if ($(1)) {
    $(x);
  }
}
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(x, `fail`);
} else {
}
x = 10;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $(x);
} else {
}
`````

## Output


`````js filename=intro
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(undefined, `fail`);
} else {
}
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $(10);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( undefined, "fail" );
}
const b = $( 1 );
if (b) {
  $( 10 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
