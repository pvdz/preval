# Preval test case

# break-finally-dead.md

> Ref tracking > Break-finally-dead
> The try/finally always breaks or throws so subsequent statements are never visited
> The try node should handle that generically, just like the if-else (and infinite loops, later)

## Input

`````js filename=intro
{
  here: {
    try {
      $(1);
      break here;
    } finally {
      $(2);
    }

    // Dead code (we could detect this)
    $('remove me'); // not relevant to the ref test
  }
  
  $(3);
}
`````

## Output

(Annotated with pids)

`````filename=intro
here___3__: /*4*/ {
  try /*6*/ {
    $(1);
    break here___12__;
  } finally /*13*/ {
    $(2);
  }
}
$(3);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
