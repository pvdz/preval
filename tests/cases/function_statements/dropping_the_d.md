# Preval test case

# dropping_the_d.md

> Function statements > Dropping the d
>
> Investigate why the d() function is dropped

Source: https://www.trickster.dev/post/javascript-obfuscation-techniques-by-example/

Afterwards, check if the last example (jsfk) works now. Otherwise fix that too.

--> function statements should be treated as decls and hoisted to the 
top of their func owner scope before further treatment. spec be damned

Note: THIS_IS_DA____ used to get renamed because preval would see the ident
      already used as an implicit global, but would not consider it referencing
      the declared func statement. So it renamed the func, as it would to dedupe.

The fix was to make sure function statements got hoisted to the top of the func
scope in the pre-normalization step.

This is a webcompat thing. In nodejs this throws an error. In the browser it's fine.

## Input

`````js filename=intro

{
  {
    function THIS_IS_DA____() {
      $('hello');
    }
  }
  $(THIS_IS_DA____());
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = THIS_IS_DA____();
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(THIS_IS_DA____());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = THIS_IS_DA____();
$( a );
`````


## Globals


BAD@! Found 1 implicit global bindings:

THIS_IS_DA____


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
