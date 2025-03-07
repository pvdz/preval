# Preval test case

# block_first_reads.md

> Assigns > Block first reads
>
> An `if` with first reads when entering but those get overwritten in both branches so it's no longer first read after the `if`

## Input

`````js filename=intro
let x = 1;
if ($) {
  $(x, 'first read (A)');
  if ($()) {
    x = 2;
  } else {
    x = 3;
  }
  $(x, 'second read (B)');
}
// List of firstReads for x should be just the A 
$(x, 'third read (C)');
`````

## Settled


`````js filename=intro
let x /*:number*/ = 1;
if ($) {
  $(1, `first read (A)`);
  const tmpIfTest /*:unknown*/ = $();
  if (tmpIfTest) {
    x = 2;
    $(2, `second read (B)`);
  } else {
    x = 3;
    $(3, `second read (B)`);
  }
} else {
}
$(x, `third read (C)`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
if ($) {
  $(1, `first read (A)`);
  if ($()) {
    x = 2;
    $(2, `second read (B)`);
  } else {
    x = 3;
    $(3, `second read (B)`);
  }
}
$(x, `third read (C)`);
`````

## Pre Normal


`````js filename=intro
let x = 1;
if ($) {
  $(x, `first read (A)`);
  if ($()) {
    x = 2;
  } else {
    x = 3;
  }
  $(x, `second read (B)`);
}
$(x, `third read (C)`);
`````

## Normalized


`````js filename=intro
let x = 1;
if ($) {
  $(x, `first read (A)`);
  const tmpIfTest = $();
  if (tmpIfTest) {
    x = 2;
  } else {
    x = 3;
  }
  $(x, `second read (B)`);
} else {
}
$(x, `third read (C)`);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = 1;
if ($) {
  $( 1, "first read (A)" );
  const b = $();
  if (b) {
    a = 2;
    $( 2, "second read (B)" );
  }
  else {
    a = 3;
    $( 3, "second read (B)" );
  }
}
$( a, "third read (C)" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 'first read (A)'
 - 2: 
 - 3: 3, 'second read (B)'
 - 4: 3, 'third read (C)'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
