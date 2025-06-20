# Preval test case

# try_catch_if_else_throw.md

> Flow > Try no throw > Try catch if else throw
>
> The throw may leave the binding mutated anyways

## Input

`````js filename=intro
function f() {
  let x = 'fail';
  try {
    if ($) {
      x = 'pass';
      throw 'yes';
    } else {
      throw 'too';
    }
  } catch {
    $(x, 'mutation is observable in the catch');
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
let x /*:string*/ /*truthy*/ = `fail`;
try {
  if ($) {
    x = `pass`;
    throw `yes`;
  } else {
    throw `too`;
  }
} catch (e) {
  $(x, `mutation is observable in the catch`);
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = `fail`;
try {
  if ($) {
    x = `pass`;
    throw `yes`;
  } else {
    throw `too`;
  }
} catch (e) {
  $(x, `mutation is observable in the catch`);
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = "fail";
try {
  if ($) {
    a = "pass";
    throw "yes";
  }
  else {
    throw "too";
  }
}
catch (b) {
  $( a, "mutation is observable in the catch" );
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = `fail`;
  try {
    if ($) {
      x = `pass`;
      throw `yes`;
    } else {
      throw `too`;
    }
  } catch (e) {
    $(x, `mutation is observable in the catch`);
  }
  $(x);
  return undefined;
};
f();
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? TemplateLiteral


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass', 'mutation is observable in the catch'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
