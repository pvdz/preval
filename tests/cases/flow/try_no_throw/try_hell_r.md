# Preval test case

# try_hell_r.md

> Flow > Try no throw > Try hell r
>
> Bunch of try/catch/finally cases0

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
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `one`;
} catch (e) {}
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
$( 2 );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
