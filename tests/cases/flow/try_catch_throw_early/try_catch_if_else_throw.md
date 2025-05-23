# Preval test case

# try_catch_if_else_throw.md

> Flow > Try catch throw early > Try catch if else throw
>
> The throw may leave the binding mutated anyways

## Options

- globals: throw_early

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
    throw_early
    $(x, 'mutation is observable in the catch');
  }
  $(x);
}
f();
`````


## Settled


`````js filename=intro
let x /*:string*/ = `fail`;
try {
  if ($) {
    x = `pass`;
    throw `yes`;
  } else {
    throw `too`;
  }
} catch (e) {
  throw_early;
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
  throw_early;
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
  throw_early;
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
    throw_early;
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


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
