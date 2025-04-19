# Preval test case

# try_hell_func_decl.md

> Flow > Try hell func decl
>
> This is why we don't properly analyze the try/catch/finally for mutation state. And this is just the tip of the ice berg. No thank you.

## Input

`````js filename=intro

{
  let x = 0;
  function f() {
    stop: try {
      x = 1;
      throw 'one';
    } catch {
      throw 'two';
    } finally {
      break stop; // Overrides the throw in the catch
    }
  }
  f();
  considerMutated(x) // always true (!)
}

{
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
  considerMutated(x) // always true (!)
}
`````


## Settled


`````js filename=intro
considerMutated(1);
considerMutated(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
considerMutated(1);
considerMutated(0);
`````


## PST Settled
With rename=true

`````js filename=intro
considerMutated( 1 );
considerMutated( 0 );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


BAD@! Found 1 implicit global bindings:

considerMutated


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
