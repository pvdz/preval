# Preval test case

# write_branch2_write_branch1_read.md

> Assigns > Write branch2 write branch1 read
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
if ($(10)) {
  if ($(20)) {
    x = $(2);
    $(x);
  }
  $(x); // This means we can't safely eliminate the first write
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
if ($(10)) {
  if ($(20)) {
    x = $(2);
    $(x);
  }
  $(x);
}
`````

## Normalized


`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  const tmpIfTest$1 = $(20);
  if (tmpIfTest$1) {
    x = $(2);
    $(x);
  } else {
  }
  $(x);
} else {
}
`````

## Output


`````js filename=intro
let x = $(1);
const tmpIfTest = $(10);
if (tmpIfTest) {
  const tmpIfTest$1 = $(20);
  if (tmpIfTest$1) {
    x = $(2);
    $(x);
  } else {
  }
  $(x);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
const b = $( 10 );
if (b) {
  const c = $( 20 );
  if (c) {
    a = $( 2 );
    $( a );
  }
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 10
 - 3: 20
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
