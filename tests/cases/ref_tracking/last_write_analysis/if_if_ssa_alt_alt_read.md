# Preval test case

# if_if_ssa_alt_alt_read.md

> Ref tracking > Last write analysis > If if ssa alt alt read
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
let x = $('a');
$(x);
// This write should be dropped since it cannot be observed
x = $('b');
if ($(1)) {
} else {
  x = $('c');
  if ($(2)) {
  } else {
    x = $('d');
  }
  // Can only observe c and d
  $(x);
}
`````

## Pre Normal

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($(1)) {
} else {
  x = $(`c`);
  if ($(2)) {
  } else {
    x = $(`d`);
  }
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  x = $(`c`);
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
  } else {
    x = $(`d`);
  }
  $(x);
}
`````

## Output

`````js filename=intro
const x = $(`a`);
$(x);
$(`b`);
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  const tmpClusterSSA_x = $(`c`);
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $(tmpClusterSSA_x);
  } else {
    const tmpClusterSSA_x$1 = $(`d`);
    $(tmpClusterSSA_x$1);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
$( "b" );
const b = $( 1 );
if (b) {

}
else {
  const c = $( "c" );
  const d = $( 2 );
  if (d) {
    $( c );
  }
  else {
    const e = $( "d" );
    $( e );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
