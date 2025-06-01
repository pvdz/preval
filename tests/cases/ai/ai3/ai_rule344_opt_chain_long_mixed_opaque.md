# Preval test case

# ai_rule344_opt_chain_long_mixed_opaque.md

> Ai > Ai3 > Ai rule344 opt chain long mixed opaque
>
> Test: Long optional chain with property access, call, and final opaque call target.

## Input

`````js filename=intro
// Expected: let x = a?.b?.c()?.$('d'); $('r', x)
let a = $('get_a');
// To make it more interesting for Preval, let's make a, b, c potentially objects or functions
// The .$ at the end is unusual, usually it would be .d or [$('d')]
let result = a?.b?.c()?.$('d_is_actually_a_method_name_here');
$('final_result', result);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`get_a`);
const tmpIfTest /*:boolean*/ = a == null;
if (tmpIfTest) {
  $(`final_result`, undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = a.b;
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
    $(`final_result`, undefined);
  } else {
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject.c;
    const tmpChainElementCall /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`);
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall == null;
    if (tmpIfTest$3) {
      $(`final_result`, undefined);
    } else {
      const tmpChainElementObject$3 /*:unknown*/ = tmpChainElementCall.$;
      const tmpChainElementCall$1 /*:unknown*/ = $dotCall(
        tmpChainElementObject$3,
        tmpChainElementCall,
        `\$`,
        `d_is_actually_a_method_name_here`,
      );
      $(`final_result`, tmpChainElementCall$1);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`get_a`);
if (a == null) {
  $(`final_result`, undefined);
} else {
  const tmpChainElementObject = a.b;
  if (tmpChainElementObject == null) {
    $(`final_result`, undefined);
  } else {
    const tmpChainElementCall = tmpChainElementObject.c();
    if (tmpChainElementCall == null) {
      $(`final_result`, undefined);
    } else {
      $(`final_result`, tmpChainElementCall.$(`d_is_actually_a_method_name_here`));
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "get_a" );
const b = a == null;
if (b) {
  $( "final_result", undefined );
}
else {
  const c = a.b;
  const d = c == null;
  if (d) {
    $( "final_result", undefined );
  }
  else {
    const e = c.c;
    const f = $dotCall( e, c, "c" );
    const g = f == null;
    if (g) {
      $( "final_result", undefined );
    }
    else {
      const h = f.$;
      const i = $dotCall( h, f, "$", "d_is_actually_a_method_name_here" );
      $( "final_result", i );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = $(`get_a`);
let result = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.c;
    const tmpChainElementCall = $dotCall(tmpChainElementObject$1, tmpChainElementObject, `c`);
    const tmpIfTest$3 = tmpChainElementCall != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$3 = tmpChainElementCall.$;
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$3, tmpChainElementCall, `\$`, `d_is_actually_a_method_name_here`);
      result = tmpChainElementCall$1;
      $(`final_result`, tmpChainElementCall$1);
    } else {
      $(`final_result`, result);
    }
  } else {
    $(`final_result`, result);
  }
} else {
  $(`final_result`, result);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_a'
 - 2: 'final_result', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
