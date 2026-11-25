const projectForm = document.getElementById("project-form");

if (projectForm) {
  const projectList = document.getElementById("project-list");
  const emptyMessage = document.getElementById("empty-message");
  const formMessage = document.getElementById("form-message");

  projectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("project-name").value.trim();
    const description = document.getElementById("project-description").value.trim();
    const files = Array.from(document.getElementById("project-files").files);

    if (!name || files.length === 0) {
      formMessage.textContent = "Please enter a project name and attach at least one file.";
      return;
    }

    if (emptyMessage) emptyMessage.remove();

    const card = document.createElement("article");
    card.className = "project-item";

    const heading = document.createElement("h3");
    heading.textContent = name;
    card.appendChild(heading);

    if (description) {
      const paragraph = document.createElement("p");
      paragraph.textContent = description;
      card.appendChild(paragraph);
    }

    const fileHeading = document.createElement("strong");
    fileHeading.textContent = "Attached files:";
    card.appendChild(fileHeading);

    const list = document.createElement("ul");
    list.className = "file-list";

    files.forEach(function (file) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const fileUrl = URL.createObjectURL(file);
      link.href = fileUrl;
      link.download = file.name;
      link.textContent = file.name;
      item.appendChild(link);
      list.appendChild(item);
    });

    card.appendChild(list);
    projectList.prepend(card);
    projectForm.reset();
    formMessage.textContent = "Project added to this page for the current browser session.";
  });
}
