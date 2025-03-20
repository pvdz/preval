# Preval test case

# if-else.md

> Continue > If-else
>
> Simple example

## Input

`````js filename=intro
while (true) {
  if ($(false)) {
    $('uhoh');
    continue;
  } else {
    $('exit');
    break;
  }
}

$('woohoo');

while (true) {
  let continued = false;
  if ($(false)) {
    $('uhoh');
  } else {
    continued = true;
    $('exit');
    break;
  }
  if (!continued) {
    
  }
}

$('woohoo');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(false);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(`uhoh`);
    const tmpIfTest$1 /*:unknown*/ = $(false);
    if (tmpIfTest$1) {
    } else {
      $(`exit`);
      break;
    }
  }
  $(`woohoo`);
} else {
  $(`exit`);
  $(`woohoo`);
}
const tmpIfTest$3 /*:unknown*/ = $(false);
if (tmpIfTest$3) {
  while ($LOOP_UNROLL_10) {
    $(`uhoh`);
    const tmpIfTest$2 /*:unknown*/ = $(false);
    if (tmpIfTest$2) {
    } else {
      $(`exit`);
      break;
    }
  }
  $(`woohoo`);
} else {
  $(`exit`);
  $(`woohoo`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(false)) {
  while (true) {
    $(`uhoh`);
    if (!$(false)) {
      $(`exit`);
      break;
    }
  }
  $(`woohoo`);
} else {
  $(`exit`);
  $(`woohoo`);
}
if ($(false)) {
  while (true) {
    $(`uhoh`);
    if (!$(false)) {
      $(`exit`);
      break;
    }
  }
  $(`woohoo`);
} else {
  $(`exit`);
  $(`woohoo`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( "uhoh" );
    const b = $( false );
    if (b) {

    }
    else {
      $( "exit" );
      break;
    }
  }
  $( "woohoo" );
}
else {
  $( "exit" );
  $( "woohoo" );
}
const c = $( false );
if (c) {
  while ($LOOP_UNROLL_10) {
    $( "uhoh" );
    const d = $( false );
    if (d) {

    }
    else {
      $( "exit" );
      break;
    }
  }
  $( "woohoo" );
}
else {
  $( "exit" );
  $( "woohoo" );
}
`````


## Todos triggered


- Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 'exit'
 - 3: 'woohoo'
 - 4: false
 - 5: 'exit'
 - 6: 'woohoo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
