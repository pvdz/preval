# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident opt c-mem call complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = $(b)?.[$("$")]?.($(1));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$5 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$5) {
  $(undefined);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`\$`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$7 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$7) {
    $(undefined);
    $(`fail1`);
    $(`fail2`);
  } else {
    const tmpCalleeParam /*:unknown*/ = $(1);
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
    $(tmpChainElementCall$1);
    $(`fail1`);
    $(`fail2`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({ $: $ });
if (tmpChainElementCall == null) {
  $(undefined);
  $(`fail1`);
  $(`fail2`);
} else {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject == null) {
    $(undefined);
    $(`fail1`);
    $(`fail2`);
  } else {
    $($dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1)));
    $(`fail1`);
    $(`fail2`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b == null;
if (c) {
  $( undefined );
  $( "fail1" );
  $( "fail2" );
}
else {
  const d = $( "$" );
  const e = b[ d ];
  const f = e == null;
  if (f) {
    $( undefined );
    $( "fail1" );
    $( "fail2" );
  }
  else {
    const g = $( 1 );
    const h = $dotCall( e, b, undefined, g );
    $( h );
    $( "fail1" );
    $( "fail2" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = undefined;
let a = undefined;
let tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  b = { $: $ };
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = $(b);
  const tmpIfTest$5 = tmpChainElementCall != null;
  if (tmpIfTest$5) {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$7 = tmpChainElementObject != null;
    if (tmpIfTest$7) {
      let tmpCalleeParam = $(1);
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
      a = tmpChainElementCall$1;
      $(tmpChainElementCall$1);
    } else {
      $(a);
    }
  } else {
    $(a);
  }
} else {
}
const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$9) {
  $(`fail1`);
} else {
}
const tmpIfTest$11 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$11) {
  $(`fail2`);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 'fail1'
 - 7: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
