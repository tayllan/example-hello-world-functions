export default async () => {
    const encoder = new TextEncoder();
    const formatter = new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3
    });
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode("<html><body><ol>"));
        let i = 0;
        const timer = setInterval(() => {
            console.log("Hello at", formatter.format(new Date()));
          controller.enqueue(
            encoder.encode(
              `<li>Hello at ${formatter.format(new Date())}</li>\n\n`
            )
          );
          if (i++ >= 1000) {
            controller.enqueue(encoder.encode("</ol></body></html>"));
            controller.close();
            clearInterval(timer);
          }
        }, 100);
      }
    });

    return new Response(body);
  };
