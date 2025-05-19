# Preval test case

# try_hell_r.md

> Flow > Try finally throw early > Try hell r
>
> Bunch of try/catch/finally cases0

## Options

- globals: throw_early

## Input

`````js filename=intro
let x = 0;
function f() {
  stop: try {
    throw 'one';
  } catch {
    x = 2;
    throw 'two';
  } finally {
    throw_early
    break stop; // Overrides the throw in the catch
  }
}
f();
$(x);
`````


## Settled


`````js filename=intro
try {
  throw `one`;
} catch (e) {}
throw_early;
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `one`;
} catch (e) {}
throw_early;
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "one";
}
catch (a) {

}
throw_early;
$( 2 );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
