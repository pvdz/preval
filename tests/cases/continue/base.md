# Preval test case

# base.md

> Continue > Base
>
> Simple example

## Input

`````js filename=intro
while (true) {
  if ($(false)) {
    $('uhoh');
    continue;
  }
  $('exit');
  break;
}
$('woohoo');




// SSA
function $continue() {
  if ($(false)) {
    $('uhoh');
    $continue(); // continue
    return;
  }
  $('exit');
  $break();
}
function $break() {
  $('woohoo');
}

$continue();


//function $continue() {
//  if ($(false)) {
//    $('uhoh');
//    $continue();
//    return;
//  } else {
//    $('exit');
//    $('woohoo');
//  }
//}
//
//$continue();

`````


## Settled


`````js filename=intro
const $continue /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $(false);
  if (tmpIfTest) {
    $(`uhoh`);
    $continue();
    return undefined;
  } else {
    $(`exit`);
    $(`woohoo`);
    return undefined;
  }
};
const tmpIfTest$1 /*:unknown*/ = $(false);
if (tmpIfTest$1) {
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
  $continue();
} else {
  $(`exit`);
  $(`woohoo`);
  $continue();
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const $continue = function () {
  if ($(false)) {
    $(`uhoh`);
    $continue();
  } else {
    $(`exit`);
    $(`woohoo`);
  }
};
if ($(false)) {
  while (true) {
    $(`uhoh`);
    if (!$(false)) {
      $(`exit`);
      break;
    }
  }
  $(`woohoo`);
  $continue();
} else {
  $(`exit`);
  $(`woohoo`);
  $continue();
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( false );
  if (b) {
    $( "uhoh" );
    a();
    return undefined;
  }
  else {
    $( "exit" );
    $( "woohoo" );
    return undefined;
  }
};
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
  a();
}
else {
  $( "exit" );
  $( "woohoo" );
  a();
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
